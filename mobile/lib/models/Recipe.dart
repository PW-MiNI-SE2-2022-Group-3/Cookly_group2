import 'ingredient.dart';
class Recipe{
  String? name;
  String? instructions;
  List<Ingredient>? ingredients;
  List<String>? tags;
  Recipe();
  @override
  String toString() {
    return 'Recipe $name, instructions $instructions, ingredients ${ingredients.toString()}, tags $tags';
  }
  Recipe.fromJson(Map<String, dynamic>? json){
    if(json==null)  return;
    name = json['name'];
    instructions = json['instructions'];
    ingredients = Ingredient.listFromJson(json['ingredients']);
    //TODO::correct tags, probably won't work. do I have to initialize tags?
    for(String? tag in json['tags'])
    {
      if(tag!=null){
        tags?.add(tag);
      }
    }
  }
}