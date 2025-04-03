--
-- Name: template_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.template_type AS ENUM (
    'newsletter',
    'newsletter-post'
);


ALTER TYPE public.template_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    id integer NOT NULL,
    code character varying NOT NULL,
    name character varying NOT NULL,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL
);


ALTER TABLE public.country OWNER TO postgres;

--
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.country_id_seq OWNER TO postgres;

--
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.country_id_seq OWNED BY public.country.id;


--
-- Name: federated_credential; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.federated_credential (
    id integer NOT NULL,
    provider character varying NOT NULL,
    "subjectId" character varying NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public.federated_credential OWNER TO postgres;

--
-- Name: federated_credential_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.federated_credential_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.federated_credential_id_seq OWNER TO postgres;

--
-- Name: federated_credential_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.federated_credential_id_seq OWNED BY public.federated_credential.id;


--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    id integer NOT NULL,
    "countryCode" character varying,
    name character varying,
    longitude double precision,
    latitude double precision
);


ALTER TABLE public.location OWNER TO postgres;

--
-- Name: location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.location_id_seq OWNER TO postgres;

--
-- Name: location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;


--
-- Name: newsletter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletter (
    id integer NOT NULL,
    created text DEFAULT now() NOT NULL,
    "creatorId" integer NOT NULL,
    modified text,
    "modifierId" integer,
    name character varying NOT NULL,
    "ownerId" integer NOT NULL,
    "startDate" text,
    "endDate" text
);


ALTER TABLE public.newsletter OWNER TO postgres;

--
-- Name: newsletter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.newsletter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.newsletter_id_seq OWNER TO postgres;

--
-- Name: newsletter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newsletter_id_seq OWNED BY public.newsletter.id;


--
-- Name: newsletter_post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletter_post (
    id integer NOT NULL,
    created text DEFAULT now() NOT NULL,
    "creatorId" integer NOT NULL,
    modified text,
    "modifierId" integer,
    title character varying NOT NULL,
    "newsletterId" integer NOT NULL,
    date text,
    "locationId" integer,
    "parentId" integer,
    "nextId" integer,
    "prevId" integer
);


ALTER TABLE public.newsletter_post OWNER TO postgres;

--
-- Name: newsletter_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.newsletter_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.newsletter_post_id_seq OWNER TO postgres;

--
-- Name: newsletter_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newsletter_post_id_seq OWNED BY public.newsletter_post.id;


--
-- Name: newsletter_post_media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletter_post_media (
    id integer NOT NULL,
    name character varying NOT NULL,
    caption character varying,
    "fileName" character varying NOT NULL,
    format character varying NOT NULL,
    type character varying NOT NULL,
    "newsletterPostId" integer NOT NULL
);


ALTER TABLE public.newsletter_post_media OWNER TO postgres;

--
-- Name: newsletter_post_media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.newsletter_post_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.newsletter_post_media_id_seq OWNER TO postgres;

--
-- Name: newsletter_post_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newsletter_post_media_id_seq OWNED BY public.newsletter_post_media.id;


--
-- Name: newsletter_post_text; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletter_post_text (
    id integer NOT NULL,
    name character varying NOT NULL,
    link character varying,
    type character varying NOT NULL,
    description character varying,
    "newsletterPostId" integer NOT NULL
);


ALTER TABLE public.newsletter_post_text OWNER TO postgres;

--
-- Name: newsletter_post_text_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.newsletter_post_text_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.newsletter_post_text_id_seq OWNER TO postgres;

--
-- Name: newsletter_post_text_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newsletter_post_text_id_seq OWNED BY public.newsletter_post_text.id;


--
-- Name: template; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.template (
    id integer NOT NULL,
    created text DEFAULT now() NOT NULL,
    "creatorId" integer NOT NULL,
    modified text,
    "modifierId" integer,
    name text NOT NULL,
    type public.template_type NOT NULL,
    config json
);


ALTER TABLE public.template OWNER TO postgres;

--
-- Name: template_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.template_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.template_id_seq OWNER TO postgres;

--
-- Name: template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.template_id_seq OWNED BY public.template.id;


--
-- Name: template_node; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.template_node (
    id integer NOT NULL,
    created text DEFAULT now() NOT NULL,
    "creatorId" integer NOT NULL,
    modified text,
    "modifierId" integer,
    "templateId" integer NOT NULL,
    data json,
    "parentId" integer,
    "nextId" integer,
    "prevId" integer
);


ALTER TABLE public.template_node OWNER TO postgres;

--
-- Name: template_node_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.template_node_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.template_node_id_seq OWNER TO postgres;

--
-- Name: template_node_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.template_node_id_seq OWNED BY public.template_node.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    "firstName" character varying,
    "lastName" character varying,
    email character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_newsletter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_newsletter (
    "userId" integer NOT NULL,
    "newsletterId" integer NOT NULL,
    role text NOT NULL
);


ALTER TABLE public.user_newsletter OWNER TO postgres;

--
-- Name: user_template; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_template (
    "userId" integer NOT NULL,
    "templateId" integer NOT NULL,
    role text NOT NULL
);


ALTER TABLE public.user_template OWNER TO postgres;

--
-- Name: country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);


--
-- Name: federated_credential id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.federated_credential ALTER COLUMN id SET DEFAULT nextval('public.federated_credential_id_seq'::regclass);


--
-- Name: location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);


--
-- Name: newsletter id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter ALTER COLUMN id SET DEFAULT nextval('public.newsletter_id_seq'::regclass);


--
-- Name: newsletter_post id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post ALTER COLUMN id SET DEFAULT nextval('public.newsletter_post_id_seq'::regclass);


--
-- Name: newsletter_post_media id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post_media ALTER COLUMN id SET DEFAULT nextval('public.newsletter_post_media_id_seq'::regclass);


--
-- Name: newsletter_post_text id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post_text ALTER COLUMN id SET DEFAULT nextval('public.newsletter_post_text_id_seq'::regclass);


--
-- Name: template id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template ALTER COLUMN id SET DEFAULT nextval('public.template_id_seq'::regclass);


--
-- Name: template_node id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_node ALTER COLUMN id SET DEFAULT nextval('public.template_node_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, "firstName", "lastName", email) FROM stdin;
1	SUPER	USER	isaac.2962@gmail.com
\.


--
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.country_id_seq', 1, false);


--
-- Name: federated_credential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.federated_credential_id_seq', 1, false);


--
-- Name: location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_id_seq', 1, false);


--
-- Name: newsletter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_id_seq', 11, true);


--
-- Name: newsletter_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_post_id_seq', 52, true);


--
-- Name: newsletter_post_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_post_media_id_seq', 1, false);


--
-- Name: newsletter_post_text_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_post_text_id_seq', 52, true);


--
-- Name: template_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.template_id_seq', 8, true);


--
-- Name: template_node_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.template_node_id_seq', 14, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 10, true);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- Name: federated_credential federated_credential_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.federated_credential
    ADD CONSTRAINT federated_credential_pkey PRIMARY KEY (id);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);


--
-- Name: newsletter newsletter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT newsletter_pkey PRIMARY KEY (id);


--
-- Name: newsletter_post_media newsletter_post_media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post_media
    ADD CONSTRAINT newsletter_post_media_pkey PRIMARY KEY (id);


--
-- Name: newsletter_post newsletter_post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post
    ADD CONSTRAINT newsletter_post_pkey PRIMARY KEY (id);


--
-- Name: newsletter_post_text newsletter_post_text_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post_text
    ADD CONSTRAINT newsletter_post_text_pkey PRIMARY KEY (id);


--
-- Name: template_node template_node_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_node
    ADD CONSTRAINT template_node_pkey PRIMARY KEY (id);


--
-- Name: template template_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template
    ADD CONSTRAINT template_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: federated_credential federated_credential_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.federated_credential
    ADD CONSTRAINT "federated_credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: newsletter newsletter_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT "newsletter_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: newsletter newsletter_modifierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT "newsletter_modifierId_fkey" FOREIGN KEY ("modifierId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: newsletter newsletter_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter
    ADD CONSTRAINT "newsletter_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."user"(id) ON DELETE RESTRICT;


--
-- Name: newsletter_post newsletter_post_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post
    ADD CONSTRAINT "newsletter_post_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: newsletter_post newsletter_post_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post
    ADD CONSTRAINT "newsletter_post_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public.location(id) ON DELETE SET NULL;


--
-- Name: newsletter_post_media newsletter_post_media_newsletterPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post_media
    ADD CONSTRAINT "newsletter_post_media_newsletterPostId_fkey" FOREIGN KEY ("newsletterPostId") REFERENCES public.newsletter_post(id) ON DELETE CASCADE;


--
-- Name: newsletter_post newsletter_post_modifierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post
    ADD CONSTRAINT "newsletter_post_modifierId_fkey" FOREIGN KEY ("modifierId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: newsletter_post newsletter_post_newsletterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post
    ADD CONSTRAINT "newsletter_post_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES public.newsletter(id) ON DELETE CASCADE;


--
-- Name: newsletter_post newsletter_post_nextid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post
    ADD CONSTRAINT newsletter_post_nextid_fkey FOREIGN KEY ("nextId") REFERENCES public.newsletter_post(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: newsletter_post newsletter_post_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post
    ADD CONSTRAINT "newsletter_post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.newsletter_post(id) ON DELETE CASCADE;


--
-- Name: newsletter_post newsletter_post_previd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post
    ADD CONSTRAINT newsletter_post_previd_fkey FOREIGN KEY ("prevId") REFERENCES public.newsletter_post(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: newsletter_post_text newsletter_post_text_newsletterPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_post_text
    ADD CONSTRAINT "newsletter_post_text_newsletterPostId_fkey" FOREIGN KEY ("newsletterPostId") REFERENCES public.newsletter_post(id) ON DELETE CASCADE;


--
-- Name: template template_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template
    ADD CONSTRAINT "template_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: template template_modifierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template
    ADD CONSTRAINT "template_modifierId_fkey" FOREIGN KEY ("modifierId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: template_node template_node_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_node
    ADD CONSTRAINT "template_node_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: template_node template_node_modifierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_node
    ADD CONSTRAINT "template_node_modifierId_fkey" FOREIGN KEY ("modifierId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: template_node template_node_nextid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_node
    ADD CONSTRAINT template_node_nextid_fkey FOREIGN KEY ("nextId") REFERENCES public.template_node(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: template_node template_node_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_node
    ADD CONSTRAINT "template_node_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.template_node(id) ON DELETE CASCADE;


--
-- Name: template_node template_node_previd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_node
    ADD CONSTRAINT template_node_previd_fkey FOREIGN KEY ("prevId") REFERENCES public.template_node(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: template_node template_node_templateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_node
    ADD CONSTRAINT "template_node_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES public.template(id) ON DELETE CASCADE;


--
-- Name: user_newsletter user_newsletter_newsletterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_newsletter
    ADD CONSTRAINT "user_newsletter_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES public.newsletter(id) ON DELETE CASCADE;


--
-- Name: user_newsletter user_newsletter_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_newsletter
    ADD CONSTRAINT "user_newsletter_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user_template user_template_templateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_template
    ADD CONSTRAINT "user_template_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES public.template(id) ON DELETE CASCADE;


--
-- Name: user_template user_template_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_template
    ADD CONSTRAINT "user_template_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;
