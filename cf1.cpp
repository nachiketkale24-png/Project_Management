#include<bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector<long long> a(n);
        for (int i = 0; i < n; i++)
            cin >> a[i];

        sort(a.begin(), a.end());

        long long ans = 0;
        int k = min(n, m);

        for (int i = 0; i < k; i++) {
            ans += a[i] * 1LL * (i + 1);
        }

        cout << ans << endl;
    }
}




















// #include <bits/stdc++.h>
// using namespace std;

// int main()
// {
//     int a;
//     cin >> a;
//     while (a--)
//     {
//         int n;
//         cin >> n;
//         int m;
//         cin >> m;
//         int t[n];
//         vector<int> a(n);
//         for (int i = 0; i < n; i++)
//             cin >> a[i];

//         vector<long long> cur(n, 0);
//         long long ans = 0;
//         for (int time = 1; time <= m; time++)
//         {
//             for (int i = 0; i < n; i++)
//             {
//                 cur[i] += a[i];
//             }
//             int best = 0;
//             for (int i = 1; i < n; i++)
//             {
//                 if (cur[i] > cur[best])
//                 {
//                     best = i;
//                 }
//             }
//             ans += cur[best];
//             cur[best] = 0;
//         }
//         cout << ans << endl;
//     }
//     return 0;
// }

//     sort(t, t+n);
//     int sum = 0;
//     int time = 0;
//     while(time < m){
//     if(sum==0){
//     sum = t[0];
//     time = 1;
//     }
//     if(time<m){
//     for(int i=n-1; i>=0; i--){
//         if(time<m){
//         sum += t[i];
//         time++;
//         }
//         else{
//             break;
//         }
//     }
//     }
//     else{
//         break;
//     }
// }
// cout<< sum << endl;
// }
