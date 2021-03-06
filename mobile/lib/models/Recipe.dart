import 'Ingredient.dart';
class Recipe{
  String name="";
  String instructions="";
  List<Ingredient>? ingredients;
  List<String>? tags;
  Recipe();
  @override
  String toString() {
    return 'Recipe $name, instructions $instructions, ingredients ${ingredients.toString()}, tags $tags';
  }
  Map<String, dynamic> toJson(){
    return {
      'name':name,
      'instructions':instructions,
      'ingredients':"placeholder for ingredients_to_json"
    };
  }
  static List<Recipe> listFromJson(List<dynamic>? JSON){
    return JSON==null?
    <Recipe>[]:JSON.map((e) => Recipe.fromJson(e)).toList();
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