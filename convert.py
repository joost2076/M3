import os
import re

def remove_leading_slash(directory):
    """
    Removes the leading slash from 'src' and 'href' attributes
    in HTML files within a given directory.
    """
    # Regex to find src="... or src='... or href="... or href='...
    # The (["']) part captures the quote type so we can match it at the end.
    # The \/ part finds the leading slash.
    # pattern = re.compile(r'(src|href)=([\'"])\/([^\'"]+)\2', re.I)
    pattern = re.compile(r'(src|href)\s*=\s*([\'"]?)\s*/([^\'"]+)\2', re.I)

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.html', '.htm')):
                file_path = os.path.join(root, file)

                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    # Use re.sub to find and replace all matches
                    # The replacement string is a backreference to the captured groups
                    # \1 is 'src' or 'href', \2 is the quote, and \3 is the path
                    modified_content = re.sub(pattern, r'\1=\2\3\2', content)

                    # Overwrite the original file with the modified content
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(modified_content)

                    print(f"Processed: {file_path}")
                except Exception as e:
                    print(f"Could not process {file_path}: {e}")


# Assuming your frozen site is in a directory called 'build'
remove_leading_slash('./')
