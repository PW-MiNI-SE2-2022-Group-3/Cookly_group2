import 'dart:convert';

import 'package:get/get.dart';
import '../models/recipe.dart';
import '../models/ingredient.dart';


class CooklyProvider extends GetConnect {
  List<dynamic> data =[{'id': 1, 'name':'chicken'}];

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