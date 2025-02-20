cmake_minimum_required(VERSION 3.13)
project(evil_portal)

# Define the application
add_executable(evil_portal
    evil_portal_10px.png
    evil_portal_app_i.h
    evil_portal_app.c
    evil_portal_app.h
    evil_portal_custom_event.h
    evil_portal_scene_config.h
    evil_portal_scene_console_output.c
    evil_portal_scene_rename.c
    evil_portal_scene_select_html.c
    evil_portal_scene_start.c
    evil_portal_scene.c
    evil_portal_scene.h
    evil_portal_storage.c
    evil_portal_storage.h
    evil_portal_uart.c
    evil_portal_uart.h 
    EvilPortal.ino
    application.fam
)

# Include directories
target_include_directories(evil_portal PRIVATE .)

# Link libraries
target_link_libraries(evil_portal PRIVATE flipper)

# Set the output file
set_target_properties(evil_portal PROPERTIES OUTPUT_NAME "evil_portal")

# Install the application
install(TARGETS evil_portal RUNTIME DESTINATION ${CMAKE_BINARY_DIR}/fap)
