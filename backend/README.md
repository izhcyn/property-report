"""
Cara jalanin backend:

1. Buat database PostgreSQL: property_report_db
2. Set env DATABASE_URL, contoh:
   export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/property_report_db
3. Install dependencies:
   pip install -r requirements.txt
4. Inisialisasi tabel:
   python -m app.init_db
5. Jalankan server:
   uvicorn app.main:app --reload

Endpoint awal:
- GET /
- GET /api/master/report-types
- GET /api/master/banks
- GET /api/dashboard/summary
- POST /api/reports/upload
- GET /api/reports
- GET /api/reports/{id}
- PUT /api/reports/{id}
"""
