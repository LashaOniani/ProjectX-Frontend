======Table Overviews======


=========================
-- Create Persons table -- 
=========================

create table LO_PROJECTX_PERSONS
(
  id          NUMBER generated always as identity,
  first_name  VARCHAR2(60),
  last_name   VARCHAR2(80),
  gender      NUMBER,
  birthday    DATE,
  email       VARCHAR2(120),
  phone       VARCHAR2(20),
  geolocation VARCHAR2(120) default 0,
  ip          VARCHAR2(16) default 0
)
tablespace TAX_DAT
  pctfree 10
  initrans 1
  maxtrans 255;
-- Create/Recreate primary, unique and foreign key constraints 
alter table LO_PROJECTX_PERSONS
  add constraint PK_LO_PROJECTX_PERSONS_ID primary key (ID)
  using index 
  tablespace TAX_DAT
  pctfree 10
  initrans 2
  maxtrans 255;

=========================
-- Create Roles table--
=========================

create table LO_PROJECTX_ROLES
(
  id            NUMBER generated always as identity,
  role          VARCHAR2(35),
  r_description VARCHAR2(160)
)
tablespace TAX_DAT
  pctfree 10
  initrans 1
  maxtrans 255;
-- Add comments to the columns 
comment on column LO_PROJECTX_ROLES.role
  is 'roles';
comment on column LO_PROJECTX_ROLES.r_description
  is 'role description';
-- Create/Recreate primary, unique and foreign key constraints 
alter table LO_PROJECTX_ROLES
  add constraint PK_LO_PROJECTX_ROLES_ID primary key (ID)
  using index 
  tablespace TAX_DAT
  pctfree 10
  initrans 2
  maxtrans 255;


=========================
-- Create Users table --
=========================

create table LO_PROJECTX_USERS
(
  id        NUMBER generated always as identity,
  p_id      NUMBER,
  r_id      NUMBER,
  user_name VARCHAR2(80),
  password  VARCHAR2(180),
  picture   BLOB
)
tablespace TAX_DAT
  pctfree 10
  initrans 1
  maxtrans 255;
-- Create/Recreate primary, unique and foreign key constraints 
alter table LO_PROJECTX_USERS
  add constraint PK_LO_PROJECTX_USERS_ID primary key (ID)
  using index 
  tablespace TAX_DAT
  pctfree 10
  initrans 2
  maxtrans 255;
alter table LO_PROJECTX_USERS
  add constraint FK_LO_PROJECTX_USERS_P_ID foreign key (P_ID)
  references LO_PROJECTX_PERSONS (ID);
alter table LO_PROJECTX_USERS
  add constraint FK_LO_PROJECTX_USERS_R_ID foreign key (R_ID)
  references LO_PROJECTX_ROLES (ID);



=================================
-- Create Question types table --
=================================
-- Create table
create table lo_projectX_question_type
(
  id   number generated always as identity,
  type varchar2(150)
)
;
-- Create/Recreate primary, unique and foreign key constraints 
alter table lo_projectX_question_type
  add constraint PK_lo_projectX_q_type_ID primary key (ID);

=============================
-- Create Questions table --
=============================
-- Create table
create table LO_PROJECTX_QUESTIONS
(
  id        number generated always as identity,
  q_type_id number,
  question  varchar2(250),
  q_img     blob
)
;
-- Create/Recreate primary, unique and foreign key constraints 
alter table LO_PROJECTX_QUESTIONS
  add constraint PK_LO_PROJECTX_Question_ID primary key (ID);
alter table LO_PROJECTX_QUESTIONS
  add constraint fk_lo_projectx_q_type_id foreign key (Q_TYPE_ID)
  references lo_projectx_question_type (ID);

============================
-- Create Q_answers table --
============================
-- Create table
create table lo_projectx_q_answers
(
  id           number generated always as identity,
  q_id         number not null,
  answer       varchar2(200),
  is_correct   number,
  answer_score number
)
;
-- Add comments to the columns 
comment on column lo_projectx_q_answers.is_correct
  is 'is correct is boolean value 1 means false 2 means true';
-- Create/Recreate primary, unique and foreign key constraints 
alter table lo_projectx_q_answers
  add constraint pk_lo_projectx_q_answers_id primary key (ID);
alter table lo_projectx_q_answers
  add constraint fk_lo_projectx_questions_id foreign key (Q_ID)
  references lo_projectx_questions (ID);

=========================================
-- Create lo_projectx_q_answered table --
=========================================
-- Create table
create table lo_projectx_q_answered
(
  id           number generated always as identity,
  u_id         number,
  q_id         number,
  a_id         number,
  attempt_numb number,
  create_date  date default sysdate
)
;
-- Create/Recreate primary, unique and foreign key constraints 
alter table lo_projectx_q_answered
  add constraint pk_lo_projectx_q_a_id primary key (ID);
alter table lo_projectx_q_answered
  add constraint fk_lo_projectx_u_id foreign key (U_ID)
  references lo_projectx_users (ID);
alter table lo_projectx_q_answered
  add constraint fk_lo_projectx_q_id foreign key (Q_ID)
  references lo_projectx_questions (ID);
alter table lo_projectx_q_answered
  add constraint fk_lo_projectx_a_id foreign key (A_ID)
  references lo_projectx_q_answers (ID);


=========================
===== Packages ======
=========================

create or replace package pkg_lo_projcetx_persons is

  procedure save_person(p_first_name  varchar2,
                        p_last_name   varchar2,
                        p_gender      number,
                        p_birthday    date,
                        p_email       varchar2,
                        p_phone       varchar2,
                        p_geolocation varchar2,
                        p_ip          varchar2
                        --p_user_name_i varchar2,
                        --p_password_i  varchar2,
                        --p_picture_i   blob default null
                        );
 procedure auth_user(p_resault out sys_refcursor, p_username varchar2, p_password varchar2);

end pkg_lo_projcetx_persons;

===========================================================

  create or replace package body pkg_lo_projcetx_persons is

  procedure save_person(p_first_name  varchar2,
                        p_last_name   varchar2,
                        p_gender      number,
                        p_birthday    date,
                        p_email       varchar2,
                        p_phone       varchar2,
                        p_geolocation varchar2,
                        p_ip          varchar2
                        --p_user_name_i varchar2,
                        --p_password_i  varchar2,
                        --p_picture_i   blob default null
                        ) as
    v_id number;
  begin
  
    insert into lo_projectx_persons
      (first_name,
       last_name,
       gender,
       birthday,
       email,
       phone,
       geolocation,
       ip)
    values
      (p_first_name,
       p_last_name,
       p_gender,
       p_birthday,
       p_email,
       p_phone,
       p_geolocation,
       p_ip)
    returning id into v_id;
  
  /*
    pkg_lo_projcetx_users.add_user(p_p_id      => v_id,
                                   p_r_id      => 5, -- დროებით მხოლოდ იუზერებისთვის hardcode
                                   p_user_name => p_user_name_i,
                                   p_password  => p_password_i,
                                   p_picture   => p_picture_i);
  */
  end;

  -- 
  procedure auth_user(p_resault out sys_refcursor, p_username varchar2, p_password varchar2) as
    begin
      open p_resault for
        select vlpuv.p_id, vlpuv.r_id
          from v_lo_projectx_user_view vlpuv
         where vlpuv.user_name = p_username
           and vlpuv.password = p_password;
    end;
 end pkg_lo_projcetx_persons;



  create or replace package pkg_lo_projcetx_persons is

  procedure save_person(p_first_name  varchar2,
                        p_last_name   varchar2,
                        p_gender      number,
                        p_birthday    date,
                        p_email       varchar2,
                        p_phone       varchar2,
                        p_geolocation varchar2,
                        p_ip          varchar2
                        --p_user_name_i varchar2,
                        --p_password_i  varchar2,
                        --p_picture_i   blob default null
                        );
  end pkg_lo_projcetx_persons;





Views

========================
====User Table View=====
========================

create or replace view v_lo_projectx_user_view as
select LPP.ID as p_id,
       LPU.ID as u_id,
       LPR.ID as r_id,
       LPP.FIRST_NAME,
       LPP.LAST_NAME,
       decode(LPP.GENDER, 1, 'კაცი', 2, 'ქალი') as gender,
       LPP.BIRTHDAY,
       LPP.EMAIL,
       LPP.PHONE,
       LPP.GEOLOCATION,
       LPP.IP,
       LPU.USER_NAME,
       LPU.PASSWORD,
       LPU.PICTURE,
       LPR.ROLE,
       LPR.R_DESCRIPTION
  from lo_projectx_persons lpp,
       lo_projectx_users   lpu,
       lo_projectx_roles   lpr
 where lpp.id = lpu.p_id
   and lpu.r_id = lpr.id;

===============================
==== question & answer view ===
===============================
create or replace view v_lo_projectX_q_and_a as
select lpq.id as Q_ID,
       lpqt.id as Q_TYPE_ID,
       lpqa.id as OPT_ANSWER_ID,
       lpqt.type as QT_TYPE,
       lpq.question as Q_QUESTION,
       lpqa.answer as OPT_ANSWER,
       lpqa.is_correct as OPT_IS_CORRECT
  from lo_projectx_q_answers     lpqa,
       lo_projectx_questions     lpq,
       lo_projectx_question_type lpqt
 where lpqa.q_id = lpq.id
   and lpq.q_type_id = lpqt.id;

===============================
==== answered questions view ===
===============================
create or replace view v_lo_projectx_q_answered as
select lpu.id as u_id,
       lpq.id as q_id,
       lpqa_a.id as a_id,
       lpp.id as p_id,
       lpp.first_name as p_fname,
       lpp.last_name as p_lname,
       lpp.email as p_email,
       lpq.question as q_question,
       lpqa_a.answer as a_answer,
       decode(lpqa_a.is_correct, 1, 'არასწორია', 2, 'სწორია') as a_is_correct,
       lpqa.attempt_numb as attempt_numb,
       lpqa.create_date as create_date
  from LO_PROJECTX_Q_ANSWERED lpqa,
       LO_PROJECTX_USERS      LPU,
       LO_PROJECTX_PERSONS    LPP,
       lo_projectx_questions  lpq,
       lo_projectx_q_answers  lpqa_a
 where lpqa.u_id = lpu.id
   and lpu.p_id = lpp.id
   and lpqa.a_id = lpqa_a.id
   and lpqa.q_id = lpq.id
