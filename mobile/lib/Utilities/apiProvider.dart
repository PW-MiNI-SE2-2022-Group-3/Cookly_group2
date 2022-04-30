import 'dart:convert';

import 'package:get/get.dart';
import '../models/recipe.dart';
import '../models/ingredient.dart';
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
    path: '/ingredients',
    port: 3001,
    queryParameters: {'page': '0', 'limit': '5000',},
  );


  Future loginMethod(String username,String password) async {
    var bytes1 = utf8.encode(password);         // data being hashed
    var passwordCrypted = sha256.convert(bytes1);
    print("username $username, password $passwordCrypted");
    var body = jsonEncode({"username": username, "password": passwordCrypted.toString()});
    var res = await http.post(Uri.parse('http://localhost:3001/login'),
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
  Future<Response> getIngredients() => get('http://localhost:3001/ingredients?page=0&limit=5000');
  // Post request
  Future<Response> postUser() => post('http://localhost:3001/ingredients',
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