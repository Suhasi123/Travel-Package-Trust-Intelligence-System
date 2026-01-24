from pydantic import BaseModel

class DocumentCreate(BaseModel):
    doc_type: str
    file_url: str
