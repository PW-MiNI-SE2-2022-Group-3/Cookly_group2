import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

GestureDetector rowButton(
    BuildContext context, String title, String nextScreen, Color color) {
  return GestureDetector(
    behavior: HitTestBehavior.translucent,
    onTap: () {
      Navigator.pushNamed(context, nextScreen);
    },
    child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      Text(
        title,
        style: TextStyle(fontSize: 22, color: color),
      ),
      IconButton(
        icon: Icon(
          Icons.chevron_right,
          color: color,
        ),
        iconSize: 22.0,
        onPressed: () async {
          Navigator.pushNamed(context, nextScreen);
        },
      ),
    ]),
  );
}
