#include<bits/stdc++.h>
using namespace std;

int main(){
    int u;
    cin>>u;
    while(u--){
        int a,x,y;
        cin>>a>>x>>y;
        if(x<a && a<y || y<a && a<x){
            cout<<"NO"<<endl;
        }
        else{
            cout<<"YES"<<endl;
        }
    }
}