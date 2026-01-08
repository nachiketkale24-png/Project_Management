#include<bits/stdc++.h>
using namespace std;

int main(){
    int a;
    cin>>a;
    while(a--){
        int n;
        cin>>n;
        int hash[n]={0};
        int t[n];
        for(int i=0;i<n;i++){
            cin>>t[i];
            hash[t[i]]++;
        }
        int max_ans_length = 0;
        int maxi=0;
        int length = 0;
        for(int i=0;i<n;i++){
            if(hash[t[i]]>maxi){
                maxi=hash[t[i]];
            }
        }
    }
}