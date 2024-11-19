import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import commentIcon from '@assets/commentIcon.svg';
import likeIcon from '@assets/likeIcon.svg';
import { theme } from '../../../styles/ThemeStyles';

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
                                <Text key={index} style={styles.itemHashtag}>{cat}</Text>
                            ))}
                        </View>
                    </View>
                    <Text style={styles.itemPreview} numberOfLines={2}>{item.preview}</Text>
                    <View style={styles.participantsStartEndContainer}>
                        <WithLocalSvg asset={likeIcon} />
                        <Text style={styles.itemLikeCount}>{item.likeCount}</Text>
                        <WithLocalSvg asset={commentIcon} />
                        <Text style={styles.itemCommentCount}>{item.commentCount} </Text>
                        <Text style={styles.itemCurrentParticipants}>{item.currentParticipants}</Text>
                        <Text style={styles.itemMaxParticipants}> / {item.maxParticipants}명</Text>
                        <Text style={styles.itemStartDate}>{item.startDate}</Text>
                        <Text style={styles.itemEndDate}> ~ {item.endDate}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomWidth: 0,
        borderBottomColor: theme.colors.grey.light,
        backgroundColor: theme.colors.background.primary,
        marginBottom: 0,
        flexDirection: 'row',
    },
    itemContent: {
        flexDirection: 'row',
        flex: 1,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 12,
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
        marginTop: 4,
        paddingVertical: 4,
        marginBottom: 4,
    },
    nameFeaturesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    itemName: {
        fontSize: theme.font.size.primary,
        fontWeight: theme.font.weight.bold,
    },
    featuresContainer: {
        flexDirection: 'row',
    },
    itemHashtag: {
        fontSize: theme.font.size.small,
        color: theme.font.color.primary,
        marginLeft: 5,
    },
    itemPreview: {
        fontSize: theme.font.size.small,
        color: theme.font.color.secondary,
        marginBottom: 5,
    },
    participantsStartEndContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    itemCurrentParticipants: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.primary,
        marginRight: 0,
    },
    itemMaxParticipants: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.light,
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
        marginRight: 10,
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