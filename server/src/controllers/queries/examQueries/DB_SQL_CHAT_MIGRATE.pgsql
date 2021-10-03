CREATE OR REPLACE FUNCTION trigger_conversation_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAat = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE Conversations{
    id serial PRIMARY KEY,
    participants integer [] NOT NULL,
    blockList boolean[] NOT NULL,
    favoriteList boolean[] NOT NULL,
    createdAt timestamp NOT NULL DEFAULT current_timestamp,
    updatedAat timestamp NOT NULL DEFAULT current_timestamp
};

CREATE TRIGGER conversation_set_timestamp
BEFORE UPDATE ON Conversations
FOR EACH ROW
EXECUTE PROCEDURE trigger_conversation_set_timestamp();


CREATE OR REPLACE FUNCTION trigger_message_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAat = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE Messages{
    id serial PRIMARY KEY,
    userId integer REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
    body varchar(160) NOT NULL CHECK(body != ''),
    conversationId integer REFERENCES Conversations(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
    createdAt timestamp NOT NULL DEFAULT current_timestamp,
    updatedAat timestamp NOT NULL DEFAULT current_timestamp
};

CREATE TRIGGER message_set_timestamp
BEFORE UPDATE ON Messages
FOR EACH ROW
EXECUTE PROCEDURE trigger_message_set_timestamp();


CREATE TABLE Catalogs{
    id serial PRIMARY KEY,
    userId integer REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
    catalogName varchar(48) NOT NULL CHECK(catalogName != '')
};

CREATE TABLE Catalogs_Conversations{
    catalogId integer REFERENCES Catalogs(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
    conversationId integer REFERENCES Conversations(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL
};