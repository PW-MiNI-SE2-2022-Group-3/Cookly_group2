import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';
import 'package:provider/provider.dart';

import '../Utilities/constants.dart';
import '../Utilities/error_popup.dart';
import '../Utilities/inputField.dart';
import '../Utilities/user_model.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({required Key key}) : super(key: key);

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  bool isLoading = false;
  String password = "", email = "", name = "", passwordAgain = "";
  bool showSpinner = false;
  List<String> args = [];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: ModalProgressHUD(
        inAsyncCall: isLoading,
        child: Center(
          child: FractionallySizedBox(
            heightFactor: 0.85,
            widthFactor: 0.8,
            child: Container(
              alignment: Alignment.center,
              color: Colors.white,
              child: ListView(children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
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
                    Container(
                      height: 120.0,
                      child: Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text(
                              'Hello,',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                              ),
                            ),
                            Text(
                              'Sign Up',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 40,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    TextField(
                        key: const Key("name_reg_TF"),
                        textAlign: TextAlign.center,
                        onChanged: (value) {
                          name = value;
                          //Do something with the user input.
                        },
                        decoration: kTextFieldDecoration.copyWith(
                            hintText: 'Enter your name')),
                    TextField(
                        key: const Key("email_reg_TF"),
                        textAlign: TextAlign.center,
                        onChanged: (value) {
                          email = value;
                          //Do something with the user input.
                        },
                        decoration: kTextFieldDecoration.copyWith(
                            hintText: 'Enter your email')),
                    TextField(
                        key: const Key("password_reg_TF"),
                        textAlign: TextAlign.center,
                        obscureText: true,
                        onChanged: (value) {
                          password = value;
                          //Do something with the user input.
                        },
                        decoration: kTextFieldDecoration.copyWith(
                            hintText: 'Enter password')),
                    TextField(
                        key: const Key("password_again_reg_TF"),
                        textAlign: TextAlign.center,
                        obscureText: true,
                        onChanged: (value) {
                          passwordAgain = value;
                          //Do something with the user input.
                        },
                        decoration: kTextFieldDecoration.copyWith(
                            hintText: 'Repeat password')),

                    SizedBox(
                      height: 100,
                    ),
                    ElevatedButton(
                        key: Key("register_button"),
                        onPressed: () async {
                          print(email);
                          try {
                            setState(() {
                              isLoading = true;
                            });
                            if (password == passwordAgain &&
                                password.length > 7) {
                              final newUser =
                                  MyUser(email, password) as Future<MyUser>;

                              if (newUser != null) {
                                args.add(name);
                                args.add(email);
                                Navigator.pushNamed(context, '/main',
                                    arguments: args);
                              }
                            } else if (password != passwordAgain) {
                              //notification about wrong password
                              ErrorNotification(
                                  context: context,
                                  title: 'Passwords do not match!',
                                  text: 'Please type your password again',
                                  answer: 'Back');
                            } else {
                              ErrorNotification(
                                  context: context,
                                  title: 'Passwords are too short',
                                  text: 'Please choose another password',
                                  answer: 'Back');
                            }

                            setState(() {
                              isLoading = false;
                              //Navigator.pushNamed(context, 'main');
                            });
                          } catch (e) {
                            if (kDebugMode) {
                              print(e);
                            }
                          }

                          setState(() {
                            isLoading = false;
                          });
                        },
                        child: Text("Register")),
                  ],
                ),
              ]),
            ),
          ),
        ),
      ),
    );
  }
}