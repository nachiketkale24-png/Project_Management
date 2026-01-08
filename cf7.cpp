#include<bits/stdc++.h>
using namespace std;

int main(){
    int a;
    cin>>a;
    while(a--){
        int n;
        cin>>n;
        int t[n];
        int hash[101]={0};
        for(int i=0;i<n;i++){
        cin>>t[i];
        hash[t[i]]++;
        }
        sort(t,t+n);
        int operations = 0;
        for(int i=0;i<n;i++){
            if(i>0 && t[i]==t[i-1]){
                continue;
            }
            else{
            if(hash[t[i]]!=t[i]){
                if(hash[t[i]]>t[i]){
                    operations += hash[t[i]] - t[i];   //twist
                }
                else{
                    operations+= hash[t[i]];
                    }
                }
            }
        }
        cout<<operations<<endl;
    }
}