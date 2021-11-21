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
    
insert into usuario (nome,email,senha) values
('Zé Almeida','ze@gmail.com','ze260145');

-- select * from usuario;

-- insert into quantidade_agua (tempo,volume,fkusuario) values
-- ('2021-11-01 17:31:00','1.500',15000),
-- ('2021-11-01 17:33:44','500',15000);

-- select * from quantidade_agua;

-- select u.nome,q.volume,q.tempo from usuario as u join quantidade_agua as q on q.fkusuario = u.idusuario where idusuario = (select idusuario from usuario where nome = 'Zé Almeida');
