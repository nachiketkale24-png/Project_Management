#include<bits/stdc++.h>
using namespace std;

int main(){
    int a;
    cin>>a;
    while(a--){
        int n;
        cin>>n;
        int t[n];
        for(int i=0;i<n;i++){
            cin>>t[i];
        }
        int count=0;
        int maxi = 0;
        for(int i=0;i<n;i++){
            maxi = max(maxi,t[i]);
            if(t[i]<maxi){
                count++;
            }
        }
        cout<<count<<endl;
    }
}