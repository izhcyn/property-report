from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.core.database import Base


class MasterBank(Base):
    __tablename__ = "master_banks"

    id = Column(Integer, primary_key=True, index=True)
    bank_code = Column(String(100), unique=True, nullable=False)
    bank_name = Column(String(255), nullable=False)
    branch_name = Column(String(255), nullable=True)
    display_name = Column(String(255), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)


class MasterBankAlias(Base):
    __tablename__ = "master_bank_aliases"

    id = Column(Integer, primary_key=True, index=True)
    master_bank_id = Column(Integer, ForeignKey("master_banks.id"), nullable=False)
    alias_name = Column(String(255), nullable=False)