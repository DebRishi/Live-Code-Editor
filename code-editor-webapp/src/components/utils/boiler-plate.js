export const cppBoiler = `#include<bits/stdc++.h>
using namespace std;

int main(){
	cout<<"Hello World!"<<endl;
	return 0;
}
`;
export const pyBoiler = `print("Hello World!")`;
export const jsBoiler = `console.log("Hello World");`;
const assemblyBoiler = `section .data
    msg db "Hello, World!",0xa
section .text
    global _start
_start:
    ; write(1, msg, 13)
    mov eax, 4
    mov ebx, 1
    mov ecx, msg
    mov edx, 13
    int 0x80
    ; exit(0)
    mov eax, 1
    xor ebx, ebx
    int 0x80`;
const bashBoiler = `#!/bin/bash
echo "Hello, World!"
`;
const basicBoiler = `PRINT "Hello, World!"`;
const cBoiler = `#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}`;

const clojureBoiler = `(println "Hello, World!")`;
const cSharpBoiler = `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`;

const cobolBoiler = `IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO.
PROCEDURE DIVISION.
    DISPLAY "Hello, World!".
    STOP RUN.`;

const commonLispBoiler = `(format t "Hello, World!~%")`;
const dBoiler = `import std.stdio;

void main() {
    writeln("Hello, World!");
}
`;
const elixirBoiler = `IO.puts "Hello, World!"`;
const erLangBoiler = `-module(hello).
-export([hello_world/0]).

hello_world() -> io:fwrite("Hello, World!\n").`;
const fSharpBoiler = `printfn "Hello, World!"`;
const fortranBoiler = `program hello
write(*,*) "Hello, World!"
end program hello`;
const goBoiler = `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`;

const groovyBoiler = `println "Hello, World!"`;
const haskellBoiler = `main = putStrLn "Hello, World!"`;
const javaBoiler = `public class HelloWorld {
	public static void main(String[] args) {
			System.out.println("Hello, World!");
	}
}`;
const kotlinBoiler = `fun main() {
	println("Hello, World!")
}`;
const luaBoiler = `print("Hello, World!")`;
const objectCBoiler = `#import <Foundation/Foundation.h>

int main() {
    @autoreleasepool {
        NSLog(@"Hello, World!");
    }
    return 0;
}
`;
const oCamlBoiler = `print_endline "Hello, World!"`;
const octaveBoiler = `printf("Hello, World!\n")`;
const pascalBoiler = `program hello;
begin
    writeln('Hello, World!');
end.`;
const perlBoiler = `print "Hello, World!\n";`;
const phpBoiler = `<?php
echo "Hello, World!\n";
?>
`;
const py2Boiler = `print "Hello, World!"`;
const py3Boiler = `print("Hello, World!")`;
const rBoiler = `cat("Hello, World!\n")`;
const rubyBoiler = `puts "Hello, World!"`;
const rustBoiler = `fn main() {
	println!("Hello, World!");
}`;
const scalaBoiler = `object HelloWorld {
  def main(args: Array[String]) {
    println("Hello, World!")
  }
}
`;
const switfBoiler = `print("Hello, World!")`;
const typescriptBoiler = `console.log("Hello, World!");`;
const visualBasicBoiler = `Module HelloWorld
Sub Main()
		Console.WriteLine("Hello, World!")
End Sub
End Module`;

export const boilerCodes = (languageId) => {
	switch (languageId) {
		case "cpp":
			return cppBoiler;
        case "java":
            return javaBoiler;
		case "python3":
            return pyBoiler;
        case "javascript":
            return jsBoiler
		default:
			return '';
	}
};

export const boilerTemplates = {
    "cpp": cppBoiler,
    "java": javaBoiler,
    "python": py3Boiler,
    "javascript": jsBoiler
};
