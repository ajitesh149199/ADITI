from pydantic import BaseModel, Field
from typing import Any, Optional

class AditiInput(BaseModel):
    source: str
    data_type: str
    data: Any
    confidence: float = Field(default= 1.0, ge=0.0, le=1.0)
    timestamp: float 
    metadata: Optional[dict] = None

class Aditidecision(BaseModel):
     priority: str
     action: str
     reason: str
     confidence: float = Field(ge=0.0, le=1.0)
     outputs: list[str]