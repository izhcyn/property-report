from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import reports, master, dashboard

app = FastAPI(title="Property Report System API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(master.router, prefix="/api/master", tags=["Master"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])


@app.get("/")
def root():
    return {"success": True, "message": "Property Report System API running"}