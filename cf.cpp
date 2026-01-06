#include <bits/stdc++.h>
using namespace std;

int main()
{
    int c;
    cin >> c;
    while (c--)
    {
        int a;
        cin >> a;
        string s;
        cin >> s;
        int hash[25] = {0};
        for (int i = 0; i < s.size(); i++)
        {
            hash[s[i] - 'a']++;
        }
        int maxi = *max_element(hash, hash + 25);
        int max_count_element = hash[maxi];
        int indifferent_element_count = 0;
        for (int i = 0; i < a; i++)
        {
            if (max_count_element == s[i] - 'a')
            {
                continue;
            }
            else
            {
                indifferent_element_count++;
            }
        }
        cout << indifferent_element_count << endl;
    }
}