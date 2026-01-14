#include<bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        string s1;
        cin>>s1;
        string s2;
        cin>>s2;
        string s3;
        cin>>s3;
        string a;
        a="";
        a.push_back(s1[0]);
        a.push_back(s2[0]);
        a.push_back(s3[0]);
        cout<<a<<endl;
    }
}