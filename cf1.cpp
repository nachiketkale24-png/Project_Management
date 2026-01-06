#include<bits/stdc++.h>
using namespace std;

int main(){
    int a;
    cin>> a;
    while(a--){
        int n;
        cin>> n;
        int s;
        cin>> s;
        int t[3];
        int sum = 0;
        for(int i=0; i<n; i++){
            cin>> t[i];
            sum += t[i];
        }
        cout<<s*sum<<endl;
    }
}