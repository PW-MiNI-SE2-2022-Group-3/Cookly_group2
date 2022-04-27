class Ingredient{
  String? name;
  String? quantity;
  Ingredient();
  @override
  String toString() {
    return 'Ingredient $name, quantity $quantity';
  }
  Ingredient.fromName(String _name){
    name = _name;
  }
  Ingredient.fromJson(Map<String, dynamic>? JSON){
    if(JSON==null) return;
    name = JSON['name'];
    quantity = JSON['quantity'];
  }
  Map<String, dynamic> toJson(){
    return {
      'name':name,
      'quantity':quantity
    };
  }
  static List<Ingredient> listFromJson(List<dynamic>? JSON){
    return JSON==null?
        <Ingredient>[]:JSON.map((e) => Ingredient.fromJson(e)).toList();
  }
}