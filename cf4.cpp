#include<bits/stdc++.h>
using namespace std;
int main(){
    int t;
    cin>>t;
    while(t--){
        int n;
        cin>>n;
        int k;
        cin>>k;
        string s;
        cin>>s;
        int count_sleep_lect=0;
        int cool_down=0;
        for(int i=0;i<s.size();i++){
            if(s[i]=='1'){
                cool_down=k;
            }
            else{
                if(cool_down==0){    
                count_sleep_lect++;
            }
            }
            if(cool_down>0 && s[i]=='0'){
                cool_down--;
            }
        }
        cout<<count_sleep_lect<<endl;
    }
}