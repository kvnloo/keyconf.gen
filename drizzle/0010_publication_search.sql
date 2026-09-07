CREATE VIRTUAL TABLE community_publication_search USING fts5(title, display_name, handle, tokenize = "unicode61 remove_diacritics 2 tokenchars '_'");
--> statement-breakpoint
INSERT INTO community_publication_search(rowid,title,display_name,handle)
SELECT rowid,json_extract(metadata,'$.title'),json_extract(author,'$.displayName'),json_extract(author,'$.handle') FROM community_publication WHERE withdrawn_at IS NULL;
--> statement-breakpoint
CREATE TRIGGER community_publication_search_insert AFTER INSERT ON community_publication WHEN new.withdrawn_at IS NULL BEGIN
INSERT INTO community_publication_search(rowid,title,display_name,handle) VALUES(new.rowid,json_extract(new.metadata,'$.title'),json_extract(new.author,'$.displayName'),json_extract(new.author,'$.handle'));
END;
--> statement-breakpoint
CREATE TRIGGER community_publication_search_update AFTER UPDATE OF metadata,author,withdrawn_at ON community_publication BEGIN
DELETE FROM community_publication_search WHERE rowid=old.rowid;
INSERT INTO community_publication_search(rowid,title,display_name,handle) SELECT new.rowid,json_extract(new.metadata,'$.title'),json_extract(new.author,'$.displayName'),json_extract(new.author,'$.handle') WHERE new.withdrawn_at IS NULL;
END;
--> statement-breakpoint
CREATE TRIGGER community_publication_search_delete AFTER DELETE ON community_publication BEGIN
DELETE FROM community_publication_search WHERE rowid=old.rowid;
END;
