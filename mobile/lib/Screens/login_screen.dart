// ignore_for_file: prefer_const_constructors

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';
import '../Utilities/constants.dart';
import '../Utilities/user_model.dart';
import '../Utilities/apiProvider.dart';
import '../Utilities/error_popup.dart';
import 'package:http/http.dart' as http;


class LoginScreen extends StatefulWidget {
  const LoginScreen({required Key key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String password = "", email = "";




  late MyUser user;

  bool isLoading = false;
  void _logIn(String name, String password) {
    setState(() {
      user = Future.delayed(const Duration(seconds: 2), () {
        return MyUser(name, password);
      }) as MyUser;
    });
  }

  @override
  Widget build(BuildContext context) {
    CooklyProvider cooklyProvider = CooklyProvider();
    return Scaffold(
      backgroundColor: Colors.white,
      body: ModalProgressHUD(
        inAsyncCall: isLoading,
        child: Container(
          decoration: BoxDecoration(
        image: DecorationImage(
            image: AssetImage('lib/assets/cookly_logo.png'),
        fit: BoxFit.scaleDown,
          alignment: Alignment.topCenter,
      ),
    ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                //Flexible(
                // child: Hero(
                //   tag: 'logoMe',
                //   child: Container(
                //     height: 200.0,
                //     child: Image.asset('images/logoMe.png'),
                //   ),
                // ),
                //),
                const SizedBox(
                  height: 48.0,
                ),
                TextField(
                    key: Key("email_TF"),
                    keyboardType: TextInputType.emailAddress,
                    textAlign: TextAlign.center,
                    onChanged: (value) {
                      email = value;
                      //Do something with the user input.
                    },
                    decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Enter your email')),
                const SizedBox(
                  height: 8.0,
                ),
                TextField(
                    key: Key("password_TF"),
                    textAlign: TextAlign.center,
                    obscureText: true,
                    onChanged: (value) {
                      password = value;
                      //Do something with the user input.
                    },
                    decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Enter your password')),
                const SizedBox(
                  height: 24.0,
                ),
                ElevatedButton(
                  style: kButtonStyle,
                    onPressed: () async {
                      try {

                          setState(() {
                            isLoading = true;
                          });
                          var resCode = await cooklyProvider.loginMethod(email, password, http.Client());
                          setState(() {
                            isLoading = false;
                            if(resCode==200) {
                              Navigator.pushNamed(context, 'main');
                            } else if(resCode==500){
                                ErrorNotification(
                                    context: context,
                                    title: '500: Internal Server Error',
                                    text: 'Please try again later or restart server',
                                    answer: 'Back');
                            }else if(resCode==403){
                                ErrorNotification(
                                    context: context,
                                    title: '403: Incorrect Credentials',
                                    text: 'Please type your email and password again',
                                    answer: 'Back');
                            }else{
                              ErrorNotification(
                                  context: context,
                                  title: 'server not responding',
                                  text: 'Please try again later or restart server',
                                  answer: 'Back');
                            }
                          });


                      } catch (e) {
                        if (kDebugMode) {
                          print(e);
                        }
                        setState(() {
                          isLoading = false;
                        });
                      }
                    },
                    child: Text("Log In")),
                TextButton(
                  style: TextButton.styleFrom(

                      ),
                  onPressed: () {
                    Navigator.pushNamed(context, 'register');
                  },
                  child: const Text("Don't have an account? Register now", style: TextStyle(color: Colors.deepOrangeAccent),),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
