DECLARE @xmlData XML

-- Load XML data from a file
SET @xmlData = (
    SELECT *
    FROM OPENROWSET(
        BULK 'C:\Users\Oluwatobilobaa\Downloads\Data Extraction\Repositories\New\Req\ENBD Process CCO.xml',
        SINGLE_BLOB) AS x
)

;WITH XMLNAMESPACES('http://www.transversal.com/NS/mf/exchange' as io)
SELECT
    REPLACE(STUFF((
        SELECT '/' + tag.value('(text())[1]', 'varchar(MAX)')
        FROM entry.nodes('io:part[io:id="title"]/io:data') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, ''), ',' , ' - ') AS Title,

    STUFF((
        SELECT '/' + tag.value('(text())[1]', 'varchar(MAX)')
        FROM entry.nodes('io:part[io:id="pubname"]/io:data') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, '') AS ArticleID,

    REPLACE(STUFF((
        SELECT '/' + tag.value('(text())[1]', 'varchar(100)')
        FROM entry.nodes('io:part[io:id="contentExpiry"]/io:data') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, ''), ',', ' - ') AS ContentExpiry,

    entry.value('(io:schema_id/text())[1]', 'varchar(100)') AS SchemaID,
    entry.value('(io:entry_ref/text())[1]', 'varchar(100)') AS EntryRef,
    entry.value('(io:version/text())[1]', 'varchar(10)') AS Version,
    entry.value('(io:status/text())[1]', 'varchar(50)') AS Status,

    -- Tags
    STUFF((SELECT '/' + tag.value('(text())[1]', 'varchar(100)')
        FROM entry.nodes('io:tag_set[io:id="brand"]/io:tag') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, '') AS BrandTags,

    STUFF((SELECT '/' + tag.value('(text())[1]', 'varchar(100)')
        FROM entry.nodes('io:tag_set[io:id="division"]/io:tag') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, '') AS DivisionTags,

    STUFF((SELECT '/' + tag.value('(text())[1]', 'varchar(100)')
        FROM entry.nodes('io:tag_set[io:id="subdept"]/io:tag') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, '') AS SubdeptTags,

    STUFF((SELECT '/' + tag.value('(text())[1]', 'varchar(100)')
        FROM entry.nodes('io:tag_set[io:id="segment"]/io:tag') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, '') AS SegmentTags,

    STUFF((SELECT '/' + tag.value('(text())[1]', 'varchar(100)')
        FROM entry.nodes('io:tag_set[io:id="product"]/io:tag') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, '') AS ProductTags,

    STUFF((SELECT '/' + tag.value('(text())[1]', 'varchar(100)')
        FROM entry.nodes('io:tag_set[io:id="process"]/io:tag') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, '') AS ProcessTags,

    STUFF((SELECT '/' + tag.value('(text())[1]', 'varchar(100)')
        FROM entry.nodes('io:tag_set[io:id="channel"]/io:tag') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, '') AS ChannelTags,

    STUFF((SELECT '/' + tag.value('(text())[1]', 'varchar(100)')
        FROM entry.nodes('io:tag_set[io:id="system"]/io:tag') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, '') AS SystemTags,

    entry.value('(io:public_hit_count/text())[1]', 'int') AS PublicHitCount,

    -- Formatted Dates (M/d/yyyy)
    FORMAT(TRY_CAST(SUBSTRING(entry.value('(io:date_created/text())[1]', 'varchar(100)'), 6, 11) AS DATE), 'M/d/yyyy') AS DateCreated,
    FORMAT(TRY_CAST(SUBSTRING(entry.value('(io:date_last_changed/text())[1]', 'varchar(100)'), 6, 11) AS DATE), 'M/d/yyyy') AS DateLastChanged,
    FORMAT(TRY_CAST(SUBSTRING(entry.value('(io:date_last_public_access/text())[1]', 'varchar(100)'), 6, 11) AS DATE), 'M/d/yyyy') AS DateLastPublicAccess,

    -- Cleaned User Info
    REPLACE(RIGHT(entry.value('(io:created_by/text())[1]', 'varchar(255)'), 
        CHARINDEX('/',REVERSE(entry.value('(io:created_by/text())[1]', 'varchar(255)')))-1), '%40', '@') AS CreatedBy,

    REPLACE(RIGHT(entry.value('(io:last_changed_by/text())[1]', 'varchar(255)'), 
        CHARINDEX('/',REVERSE(entry.value('(io:last_changed_by/text())[1]', 'varchar(255)')))-1), '%40', '@') AS LastChangedBy,

    -- Notes
    REPLACE(STUFF((SELECT '/' + tag.value('(text())[1]', 'varchar(MAX)')
        FROM entry.nodes('io:part[io:id="notes"]/io:data') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 1, ''), ',' , '; ') AS ArticleNotes,

    -- Supplementary Terms
    REPLACE(STUFF((SELECT '; ' + REPLACE(REPLACE(REPLACE(
        LTRIM(RTRIM(tag.value('(text())[1]', 'varchar(MAX)'))), CHAR(10), ''), CHAR(13), ''), CHAR(9), '')
        FROM entry.nodes('io:part[io:id="keywords"]/io:data') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 2, ''), ',' , '; ') AS SupplementaryTerms,

    -- STG Supplementary Terms
    REPLACE(STUFF((SELECT '; ' + REPLACE(REPLACE(REPLACE(
        LTRIM(RTRIM(tag.value('(text())[1]', 'varchar(MAX)'))), CHAR(10), ''), CHAR(13), ''), CHAR(9), '')
        FROM entry.nodes('io:part[io:id="keywordsNew"]/io:data') AS tags(tag)
        FOR XML PATH(''), TYPE).value('.', 'varchar(max)'), 1, 2, ''), ',' , '; ') AS STGSupplementaryTerms

FROM @xmlData.nodes('/io:root/io:entry') AS tab(entry)



