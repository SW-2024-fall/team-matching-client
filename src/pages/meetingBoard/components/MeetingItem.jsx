import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import commentIcon from '@assets/commentIcon.svg';
import likeIcon from '@assets/likeIcon.svg';
import { theme } from '@styles/ThemeStyles';

const MeetingItem = ({ item, onPress }) => {
    return (
        <Pressable style={styles.itemContainer} onPress={onPress}>
            <View style={styles.itemContent}>
                <View 
                    style={[
                        styles.imageContainer, 
                        { backgroundColor: item.image ? 'transparent' : theme.colors.grey.light }
                    ]}
                >
                    {item.image ? (
                        <Image source={{ uri: item.image }} style={styles.imageContainer} />
                    ) : (
                        <Text style={styles.placeholderText}>기본이미지</Text>
                    )}
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.nameFeaturesContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.featuresContainer}>
                            {item.features.map((cat, index) => (
                                <Text key={index} style={styles.itemHashtag}>#{cat}</Text>
                            ))}
                        </View>
                    </View>
                    <Text style={styles.itemPreview} numberOfLines={2}>{item.preview}</Text>
                    <View style={styles.participantsStartEndContainer}>
                        <View style ={styles.likesComments}>
                            <WithLocalSvg asset={likeIcon} />
                            <Text style={styles.itemLikeCount}>{item.likeCount}</Text>
                            <WithLocalSvg asset={commentIcon} />
                            <Text style={styles.itemCommentCount}>{item.commentCount} </Text>
                        </View>
                        <Text style={styles.separator}> | </Text>
                        <View style ={styles.participants}>
                            <Text style={styles.itemCurrentParticipants}>{item.currentParticipants}</Text>
                            <Text style={styles.itemMaxParticipants}> / {item.maxParticipant}명</Text>
                        </View>
                        <Text style={styles.separator}> | </Text>
                        <View style ={styles.date}>
                            <Text style={styles.itemStartDate}>{item.startDate}</Text>
                            <Text style={styles.itemEndDate}> ~ {item.endDate}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomColor: theme.colors.grey.light,
        backgroundColor: theme.colors.background.primary,
        paddingBottom: 15,
        flexDirection: 'row',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: theme.border.radius.small,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: theme.font.color.primary,
        fontWeight: theme.font.weight.primary,
    },
    textContainer: {
        flex: 1,
        paddingVertical: 4,
    },
    nameFeaturesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: theme.font.size.primary,
        color: theme.font.color.primary,
        fontWeight: '600',
    },
    featuresContainer: {
        flexDirection: 'row',
    },
    itemHashtag: {
        fontSize: theme.font.size.small,
        color: theme.font.color.primary,
        fontWeight: '400',
        padding: 4,
    },
    itemPreview: {
        fontSize: theme.font.size.small,
        color: theme.font.color.primary,
        fontWeight: '400',
    },
    participantsStartEndContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 4,
    },
    separator: {
        color: theme.font.color.light,
        fontSize: theme.font.size.small,
        paddingRight: 8,
    },
    participants: {
        flexDirection: 'row',
        marginRight: 8,
    },
    itemCurrentParticipants: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.primary,
        fontWeight: '400',
    },
    itemMaxParticipants: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.light,
        fontWeight: '400',
    },
    likesComments: {
        flexDirection: 'row',
        marginRight: 8,
    },
    itemLikeCount: {
        marginLeft: 4,
        fontSize: theme.font.size.xSmall,
        color: theme.colors.red.primary,
        marginRight: 10,
    },
    itemCommentCount: {
        marginLeft: 4,
        fontSize: theme.font.size.xSmall,
        color: theme.colors.blue.primary,
    },
    date: {
        flexDirection: 'row',
    },
    itemStartDate: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.light,
    },
    itemEndDate: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.light,
    },
});

export default MeetingItem;
