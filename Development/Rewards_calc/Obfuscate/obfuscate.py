import base64
from jsmin import jsmin
import sys
import os

def obfuscate_js_file(input_file, output_file):
    try:
        # Read and minify the JS content
        with open(input_file, 'r', encoding='utf-8') as f:
            js_code = f.read()
            minified_code = jsmin(js_code)

        # Encode with base64
        encoded = base64.b64encode(minified_code.encode('utf-8')).decode('utf-8')

        # Generate the final obfuscated JS
        wrapper = f"""
// Obfuscated JS
(function() {{
    const decoded = atob("{encoded}");
    (new Function(decoded))();
}})();
"""

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(wrapper)

        print(f"✅ Obfuscated file saved as: {output_file}")

    except Exception as e:
        print(f"❌ Error: {e}")

# Example usage
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python obfuscate_js.py input.js output.js")
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
        obfuscate_js_file(input_file, output_file)
