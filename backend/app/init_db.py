from app.core.database import Base, engine
from app.models.report import Report
from app.models.bank import MasterBank, MasterBankAlias


def init():
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully.")


if __name__ == "__main__":
    init()