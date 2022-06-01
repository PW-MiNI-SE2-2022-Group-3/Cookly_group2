import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';

import '../Utilities/apiProvider.dart';
import '../Utilities/constants.dart';
import '../Utilities/error_popup.dart';

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
    CooklyProvider cooklyProvider = CooklyProvider();
    return Scaffold(
      backgroundColor: Colors.white,
      body: ModalProgressHUD(
        inAsyncCall: isLoading,
        child: Container(
          decoration: const BoxDecoration(
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
                  height: 150,
                ),
                // Container(
                //   height: 120.0,
                //   child: Padding(
                //     padding: const EdgeInsets.all(20.0),
                //     child: Column(
                //       mainAxisAlignment: MainAxisAlignment.end,
                //       crossAxisAlignment: CrossAxisAlignment.start,
                //       children: const [
                //         Text(
                //           'Hello,',
                //           style: TextStyle(
                //             color: Colors.deepOrangeAccent,
                //             fontSize: 20,
                //           ),
                //         ),
                //         Text(
                //           'Sign Up',
                //           style: TextStyle(
                //             color: Colors.deepOrangeAccent,
                //             fontSize: 40,
                //             fontWeight: FontWeight.bold,
                //           ),
                //         ),
                //       ],
                //     ),
                //   ),
                // ),

                TextField(
                    key: const Key("name_reg_TF"),
                    textAlign: TextAlign.center,
                    onChanged: (value) {
                      name = value;
                      //Do something with the user input.
                    },
                    decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Enter your name')),
                const SizedBox(
                  height: 8.0,
                ),
                TextField(
                    key: const Key("email_reg_TF"),
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
                    key: const Key("password_reg_TF"),
                    textAlign: TextAlign.center,
                    obscureText: true,
                    onChanged: (value) {
                      password = value;
                      //Do something with the user input.
                    },
                    decoration: kTextFieldDecoration.copyWith(
                        hintText: 'Enter password')),
                const SizedBox(
                  height: 8.0,
                ),
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
                  height: 10,
                ),
                ElevatedButton(
                    style: kButtonStyle,
                    key: Key("register_button"),
                    onPressed: () async {
                      print(email);
                      try {
                        setState(() {
                          isLoading = true;
                        });
                        // if(name.length<2){
                        //   ErrorNotification(
                        //       context: context,
                        //       title: 'You must provide name!',
                        //       text: 'Please enter your name',
                        //       answer: 'Back');
                        // }
                        if (password == passwordAgain &&
                            password.length > 2 &&
                            name.length > 1) {
                          var resCode = await cooklyProvider.registerMethod(
                              email, password, http.Client());
                          setState(() {
                            isLoading = false;
                            if (resCode == 200) {
                              Navigator.pushNamed(context, 'main');
                            } else if (resCode == 404) {
                              ErrorNotification(
                                  context: context,
                                  title: '404: Path Not Found',
                                  text:
                                      'API endpoint has not been programmed or is incorrect',
                                  answer: 'Back');
                            } else if (resCode == 403) {
                              ErrorNotification(
                                  context: context,
                                  title: '403: Username Already Exists',
                                  text: 'Please choose another name',
                                  answer: 'Back');
                            } else if (resCode == 500) {
                              ErrorNotification(
                                  context: context,
                                  title: '500: Internal Server Error',
                                  text:
                                      'Please try again later or restart server',
                                  answer: 'Back');
                            } else {
                              ErrorNotification(
                                  context: context,
                                  title: 'server not responding',
                                  text:
                                      'Please try again later or restart server',
                                  answer: 'Back');
                            }
                          });

                          // final newUser =
                          //     MyUser(email, password) as Future<MyUser>;

                          // if (newUser != null) {
                          //   args.add(name);
                          //   args.add(email);
                          //   Navigator.pushNamed(context, '/main',
                          //       arguments: args);
                          // }

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
                              title: 'name or password is too short',
                              text: 'Please choose another password/name',
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
                TextButton(
                  style: TextButton.styleFrom(),
                  onPressed: () {
                    Navigator.pushNamed(context, 'login');
                  },
                  child: const Text(
                    "Already have an account? Login here",
                    style: TextStyle(color: Colors.deepOrangeAccent),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
