import 'dart:convert';

import 'package:get/get.dart';
import '../models/Recipe.dart';
import '../models/Ingredient.dart';
import 'package:crypto/crypto.dart';
import 'package:http/http.dart' as http;
class CooklyProvider extends GetConnect {
  List<dynamic> data =[{'id': 1, 'name':'chicken'}];
  var url = Uri.parse('http://localhost:3001/');
  var AuthToken='';
  var ingredientUrl2 = Uri.parse('http://localhost:3001/ingredients?page=0&limit=5000');
  var ingredientUrl = Uri(
    scheme: 'http',
    host: 'localhost',
    path: '/ingredients/all',
    port: 3001,
    queryParameters: {'page': '0', 'limit': '5000',},
  );
  var recipesUrl = Uri(
    scheme: 'http',
    host: 'localhost',
    path: '/recipes/all',
    port: 3001,
    queryParameters: {'page': '0', 'limit': '5000',},
  );

  Future<List<Recipe>> fetchRecipes(List<Ingredient> args, http.Client client) async {
    final response = await client.post(recipesUrl,
      headers: {"Content-Type": "application/json"},
      // body: jsonEncode(args),
    );
    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var r = jsonDecode(response.body);
      print(r);
      List<Recipe> recipes = Recipe.listFromJson(r['recipes']);
      print("decoded first"+recipes.first.instructions);
      return recipes;

    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      print('error response code: ${response.statusCode}');
      throw Exception('Failed to load recipes');
    }
  }

  Future<List<Ingredient>> fetchIngredients(http.Client client) async {
    final response = await client.post(ingredientUrl,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"name":""},),);
    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var r = jsonDecode(response.body);

      List<Ingredient> ingredients = List.generate(r['ingredients'].length, (index) =>
          Ingredient.fromName(r['ingredients'][index]['name']));
      return ingredients;

    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      print('error response code: ${response.statusCode}');
      throw Exception('Failed to load ingredients');
    }
  }

  Future loginMethod(String username,String password, http.Client client) async {
    var bytes1 = utf8.encode(password);         // data being hashed
    var passwordCrypted = sha256.convert(bytes1);
    print("username $username, password $passwordCrypted");
    var body = jsonEncode({"username": username, "password": passwordCrypted.toString()});
    var res = await client.post(Uri.parse('http://localhost:3001/login'),
        headers: {"Content-Type": "application/json"},
        body: body);
    print('res : ${res.statusCode}');


    if (res.statusCode == 200){ final exData = jsonDecode(res.body);

    print(exData);
    return res.statusCode;
    } else{
      final exData = jsonDecode(res.body);

      print(exData);
      return res.statusCode;
    }

  }

  // Get request
  Future<Response> getIngredients() => get('http://localhost:3001/ingredients/next?page=0&limit=5000');
  Future<Response> postngredients() => post('http://localhost:3001/ingredients/all?page=0&limit=5000', {"name":"",},);
  // Post request
  Future<Response> postIngredient() => post('http://localhost:3001/ingredients',
      jsonEncode({'id': 1, 'name':'chicken'})) ;
  // // Post request with File
  // Future<Response<CasesModel>> postCases(List<int> image) {
  //   final form = FormData({
  //     'file': MultipartFile(image, filename: 'avatar.png'),
  //     'otherFile': MultipartFile(image, filename: 'cover.png'),
  //   });
  //   return post('http://youapi/users/upload', form);
  // }

  GetSocket userMessages() {
    return socket('https://yourapi/users/socket');
  }
}