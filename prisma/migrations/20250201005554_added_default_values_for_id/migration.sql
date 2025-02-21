-- AlterTable
CREATE SEQUENCE comment_id_seq;
ALTER TABLE "Comment" ALTER COLUMN "id" SET DEFAULT nextval('comment_id_seq');
ALTER SEQUENCE comment_id_seq OWNED BY "Comment"."id";

-- AlterTable
CREATE SEQUENCE form_id_seq;
ALTER TABLE "Form" ALTER COLUMN "id" SET DEFAULT nextval('form_id_seq');
ALTER SEQUENCE form_id_seq OWNED BY "Form"."id";

-- AlterTable
CREATE SEQUENCE likes_id_seq;
ALTER TABLE "Likes" ALTER COLUMN "id" SET DEFAULT nextval('likes_id_seq');
ALTER SEQUENCE likes_id_seq OWNED BY "Likes"."id";

-- AlterTable
CREATE SEQUENCE option_id_seq;
ALTER TABLE "Option" ALTER COLUMN "id" SET DEFAULT nextval('option_id_seq');
ALTER SEQUENCE option_id_seq OWNED BY "Option"."id";

-- AlterTable
CREATE SEQUENCE question_id_seq;
ALTER TABLE "Question" ALTER COLUMN "id" SET DEFAULT nextval('question_id_seq');
ALTER SEQUENCE question_id_seq OWNED BY "Question"."id";

-- AlterTable
CREATE SEQUENCE tag_id_seq;
ALTER TABLE "Tag" ALTER COLUMN "id" SET DEFAULT nextval('tag_id_seq');
ALTER SEQUENCE tag_id_seq OWNED BY "Tag"."id";

-- AlterTable
CREATE SEQUENCE template_id_seq;
ALTER TABLE "Template" ALTER COLUMN "id" SET DEFAULT nextval('template_id_seq');
ALTER SEQUENCE template_id_seq OWNED BY "Template"."id";

-- AlterTable
CREATE SEQUENCE topic_id_seq;
ALTER TABLE "Topic" ALTER COLUMN "id" SET DEFAULT nextval('topic_id_seq');
ALTER SEQUENCE topic_id_seq OWNED BY "Topic"."id";
