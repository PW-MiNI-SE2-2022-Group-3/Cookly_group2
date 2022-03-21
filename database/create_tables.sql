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
    id number not null,
    name varchar(30) not null,
    constraint ingredients_pk primary key (id)
);

create table recipes (
    id number not null,
    name varchar(30) not null,
    instructions varchar(1000) not null,
    constraint recipes_pk primary key (id)
);

create table shops (
    id number not null,
    name varchar(30) not null,
    constraint shops_pk primary key (id)
);

create table restaurants (
    id number not null,
    name varchar(30) not null,
    constraint restaurants_pk primary key (id)
);

create table tags (
    id number not null,
    name varchar(30) not null,
    constraint tags_pk primary key (id)
);

create table users (
    id number not null,
    username varchar(30) not null,
    password varchar(64) not null,
    constraint users_pk primary key (id)
);

create table ingredient_recipe (
    recipe_id number not null,
    ingredient_id number not null,
    quantity varchar(30),
    constraint recipes_ingredient_fk foreign key (recipe_id) references recipes(id),
    constraint ingredient_recipe_fk foreign key (ingredient_id) references ingredients(id)
);

create table restaurant_recipe (
    recipe_id number not null,
    restaurant_id number not null,
    price number not null,
    constraint recipes_restaurants_fk foreign key (recipe_id) references recipes(id),
    constraint restaurants_recipes_fk foreign key (restaurant_id) references restaurants(id)
);

create table shop_ingredient (
    shop_id number not null,
    ingredient_id number not null,
    price number not null,
    constraint shops_ingredients_fk foreign key (shop_id) references shops(id),
    constraint ingredients_shops_fk foreign key (ingredient_id) references ingredients(id)
);


create table recipe_user (
    recipe_id number not null,
    user_id number not null,
    constraint recipes_users_fk foreign key (recipe_id) references recipes(id),
    constraint users_recipes_fk foreign key (user_id) references users(id)
);

create table recipe_tag (
    recipe_id number not null,
    tag_id number not null,
    constraint recipes_tagss_fk foreign key (recipe_id) references recipes(id),
    constraint tags_recipes_fk foreign key (tag_id) references tags(id)
);