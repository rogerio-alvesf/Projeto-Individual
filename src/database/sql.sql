create database saude_bemestar;

use saude_bemestar;

create table usuario(
	id int primary key auto_increment,
	nome varchar(50) not null,
	email varchar(50) not null,
	senha varchar(50) not null,
    quantidade_ideal double
)auto_increment = 15000;

create table quantidade_agua(
	id int primary key auto_increment,
    tempo time not null,
    volume double not null,
    fkusuario int,
    constraint chave_usuario foreign key (fkusuario) references usuario(id)
);
