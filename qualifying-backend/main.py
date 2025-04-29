from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Data(Base):
    __tablename__ = "data"
    id = Column(Integer, primary_key=True, index=True)
    cards = Column(String, default="")
    groups = Column(String, default="")
    tags = Column(String, default="")


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CardsRequest(BaseModel):
    cards: str


class GroupsRequest(BaseModel):
    groups: str


class TagsRequest(BaseModel):
    tags: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/save_cards")
async def save_cards(request: CardsRequest, db: Session = Depends(get_db)):
    try:
        db_entry = db.query(Data).first()
        if db_entry:
            db_entry.cards = request.cards
        else:
            db_entry = Data(cards=request.cards)
            db.add(db_entry)
        db.commit()
        return {"message": "Cards saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/save_groups")
async def save_groups(request: GroupsRequest, db: Session = Depends(get_db)):
    try:
        db_entry = db.query(Data).first()
        if db_entry:
            db_entry.groups = request.groups
        else:
            db_entry = Data(groups=request.groups)
            db.add(db_entry)
        db.commit()
        return {"message": "Groups saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/save_tags")
async def save_tags(request: TagsRequest, db: Session = Depends(get_db)):
    try:
        db_entry = db.query(Data).first()
        if db_entry:
            db_entry.tags = request.tags
        else:
            db_entry = Data(tags=request.tags)
            db.add(db_entry)
        db.commit()
        return {"message": "Tags saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/get_cards")
async def get_cards(db: Session = Depends(get_db)):
    db_entry = db.query(Data).first()
    return {"cards": db_entry.cards if db_entry else ""}


@app.get("/get_groups")
async def get_groups(db: Session = Depends(get_db)):
    db_entry = db.query(Data).first()
    return {"groups": db_entry.groups if db_entry else ""}


@app.get("/get_tags")
async def get_tags(db: Session = Depends(get_db)):
    db_entry = db.query(Data).first()
    return {"tags": db_entry.tags if db_entry else ""}
