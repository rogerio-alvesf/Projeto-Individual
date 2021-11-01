create database saude_bemestar;

use saude_bemestar;

create table usuario(
	idusuario int primary key auto_increment,
	nome varchar(50) not null,
	email varchar(50) not null,
	senha varchar(50) not null
)auto_increment = 15000;

create table quantidade_agua(
	idqtdagua int primary key auto_increment,
    tempo datetime not null,
    volume double not null,
    fkusuario int,
    constraint chave_usuario foreign key (fkusuario) references usuario(idusuario)
    );
    
insert into usuario (nome,email,senha) values
('Zé Almeida','zé@gamil.com','zé 260145');

-- select * from usuario;

-- insert into quantidade_agua (tempo,volume,fkusuario) values
-- ('2021-11-01 17:31:00','1.500',15000),
-- ('2021-11-01 17:33:44','500',15000);

-- select * from quantidade_agua;

-- select u.nome,q.volume,q.tempo from usuario as u join quantidade_agua as q on q.fkusuario = u.idusuario where idusuario = (select idusuario from usuario where nome = 'Zé Almeida');
