import PyPDF2
import sys

def read_pdf(file_path):
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ''
            for i in range(min(10, len(reader.pages))): # Read up to 10 pages
                text += reader.pages[i].extract_text()
            print(text[:2000]) # Print first 2000 chars
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        read_pdf(sys.argv[1])
