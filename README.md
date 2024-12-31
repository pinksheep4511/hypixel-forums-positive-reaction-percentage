# hypixel.positive_reaction_percentage
This script will display the positive reaction percentage of a forum user under their reaction bar when looking at threads

Reaction score and positive reaction percentage are two metrics used to measure a user's reputation on the forums

## How it works
When viewing threads:
1. Get every user with reactions
2. Get the number of positive and negative reactions for each user
3. Calculate the percentage of received reactions that are positive
4. Display this percentage below every user's reaction bar

Formula for positive reaction percentage: [positives ÷ (positives + negatives) × 100]
