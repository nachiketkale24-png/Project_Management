#include<bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        int count=0;
        if(n<=2){
            count = 0;
        }
        while(n>=3){
            n--;
            n--;
            count++;
        }
        cout<<count<<endl;
    }
}