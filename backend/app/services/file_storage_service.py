import os
from uuid import uuid4
from fastapi import UploadFile

UPLOAD_DIR = "storage/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_pdf_file(file: UploadFile) -> tuple[str, str]:
    ext = os.path.splitext(file.filename)[1].lower()
    new_name = f"{uuid4().hex}{ext}"
    full_path = os.path.join(UPLOAD_DIR, new_name)

    with open(full_path, "wb") as f:
        f.write(file.file.read())

    return file.filename, full_path