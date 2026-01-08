#include<bits/stdc++.h>
using namespace std;

int main(){
    int n;
    cin >> n;
    while(n--){
        int a;
        cin>>a;
        if(a%2==1){
            cout<<0<<endl;
        }
        else{
            cout<<(a/4)+1<<endl;
        }
    }
    return 0;
}