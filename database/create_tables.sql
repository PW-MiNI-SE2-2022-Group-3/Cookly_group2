drop table recipe_user;
drop table recipe_tag;
drop table restaurant_recipe;
drop table shop_ingredient;
drop table ingredient_recipe;
drop table ingredients;
drop table recipes;
drop table shops;
drop table restaurants;
drop table tags;
drop table users;

create table ingredients (
    id int not null AUTO_INCREMENT,
    name varchar(30) not null,
    constraint ingredients_pk primary key (id)
) engine = INNODB;



create table recipes (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) not null,
    instructions varchar(1000) not null,
    constraint recipes_pk primary key (id)
)engine = INNODB;

create table shops (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) not null,
    constraint shops_pk primary key (id)
)engine = INNODB;

create table restaurants (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) not null,
    constraint restaurants_pk primary key (id)
)engine = INNODB;

create table tags (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) not null,
    constraint tags_pk primary key (id)
)engine = INNODB;

create table users (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(30) not null,
    password varchar(64) not null,
    token varchar(36) not null,
    is_admin int not null,
    constraint users_pk primary key (id)
)engine = INNODB;

create table ingredient_recipe (
    recipe_id int not null,
    ingredient_id int not null,
    quantity varchar(30),
    constraint recipes_ingredient_fk foreign key (recipe_id) references recipes(id) on update cascade on delete cascade,
    constraint ingredient_recipe_fk foreign key (ingredient_id) references ingredients(id) on update cascade on delete cascade
);

create table restaurant_recipe (
    recipe_id int not null,
    restaurant_id int not null,
    price int not null,
    constraint recipes_restaurants_fk foreign key (recipe_id) references recipes(id) on update cascade on delete cascade,
    constraint restaurants_recipes_fk foreign key (restaurant_id) references restaurants(id) on update cascade on delete cascade
);

create table shop_ingredient (
    shop_id int not null,
    ingredient_id int not null,
    price int not null,
    constraint shops_ingredients_fk foreign key (shop_id) references shops(id) on update cascade on delete cascade,
    constraint ingredients_shops_fk foreign key (ingredient_id) references ingredients(id) on update cascade on delete cascade
);


create table recipe_user (
    recipe_id int not null,
    user_id int not null,
    constraint recipes_users_fk foreign key (recipe_id) references recipes(id) on update cascade on delete cascade,
    constraint users_recipes_fk foreign key (user_id) references users(id) on update cascade on delete cascade
);

create table recipe_tag (
    recipe_id int not null,
    tag_id int not null,
    constraint recipes_tagss_fk foreign key (recipe_id) references recipes(id) on update cascade on delete cascade,
    constraint tags_recipes_fk foreign key (tag_id) references tags(id) on update cascade on delete cascade
);