#include<bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin>>t;
    while(t--){
        int a;
        cin>>a;
        int y;
        cin>>y;
        int r;
        cin>>r;
        int ans = 0;
        ans = y/2 + r;
        if(ans>a){
            ans = a;
        }
        cout<<ans<<endl;
    }
}