import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AppContext } from '../context/AppContext';
// import useTimer from '../hooks/useTimer';
import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation

const Scoreboard = () => {
    // const { finalTime } = useTimer();
    const { correctCells, incorrectCells, handleRestart, finalTime, setIsFormVisible, setShowScoreboard } = useContext(AppContext);
    // const navigation = useNavigation(); // Get navigation from React Navigation

    const totalCells = correctCells.size + incorrectCells.size;
    const accuracy = totalCells > 0 ? (correctCells.size / totalCells) * 100 : 0;

    const convertTimeToSeconds = (formattedTime) => {
        if (!formattedTime) return 0; // Return 0 if finalTime is null or undefined
    
        const timeParts = formattedTime.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const seconds = parseInt(timeParts[2], 10);
    
        return (hours * 3600) + (minutes * 60) + seconds; 
    };
    const timeInSeconds = useMemo(() => {
        if (!finalTime) return 0; // Return 0 if finalTime is null or undefined
        return convertTimeToSeconds(finalTime);
      }, [finalTime]);
    
      const timeInMinutes = useMemo(() => (timeInSeconds / 60).toFixed(1), [timeInSeconds]);
    
    // Handle navigation back
    const handleBackPress = () => {
        setShowScoreboard(false);

    };

    const handleGoToHome = () =>{
        setShowScoreboard(false);
        setIsFormVisible(true);
        handleRestart();
    }

    return (
        <View style={styles.container}>
            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity
                 onPress={handleBackPress}
                 >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Summary Screen</Text>
            </View>
            <View style={styles.separatorLine} />

            {/* Title */}
            <Text style={styles.title}>Well Done! Here's Your Performance Summary</Text>

            {/* Attempted and Time Taken */}
            <View style={styles.summaryContainer}>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryValue}>{totalCells}</Text>
                    <Text style={styles.summaryLabel}>Attempted</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryValue}>{timeInMinutes} min</Text>
                    <Text style={styles.summaryLabel}>Time Taken</Text>
                </View>
            </View>

            {/* Separator Line */}
            <View style={styles.separatorLineFullWidth} />

            {/* Right, Wrong, and Velocity */}
            <View style={styles.statRow}>
                <View style={styles.statItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#29387b" />
                    <Text style={styles.statLabel}>Right Question</Text>
                    <Text style={styles.statValue}>{correctCells.size} Out of {totalCells}</Text>
                </View>
                <View style={styles.separatorLine} />
                <View style={styles.statItem}>
                    <Ionicons name="close-circle" size={20} color="#D9534F" />
                    <Text style={styles.statLabel}>Wrong Question</Text>
                    <Text style={styles.statValue}>{incorrectCells.size} Out of {totalCells}</Text>
                </View>
                <View style={styles.separatorLine} />
                <View style={styles.statItem}>
                    <Ionicons name="speedometer" size={20} color="#007BFF" />
                    <Text style={styles.statLabel}>Velocity</Text>
                    <Text style={styles.statValue}>{(totalCells / timeInMinutes).toFixed(2)} Task/min</Text>
                </View>
            </View>

            {/* Bottom Separator Line */}
            <View style={styles.separatorLineFullWidth} />

            {/* Check Report */}
            <View style={styles.reportContainer}>
                <Text style={styles.reportText}>Check your report</Text>
                <TouchableOpacity style={styles.reviewButton}>
                    <Text style={styles.reviewButtonText}>Review Tasks</Text>
                    <Ionicons name="arrow-forward" size={20} color="#007BFF" />
                </TouchableOpacity>
            </View>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.goHomeButton} onPress={handleGoToHome}>
                    <Text style={styles.goHomeText}>Go to home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resumeButton} onPress={handleRestart}>
                    <Text style={styles.resumeButtonText}>Restart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        elevation: 4,
        // marginTop: 35,
        alignItems: 'center',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 14,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 20,
        textAlign: 'left',
        color: '#333',
        paddingTop:15,
    },
    summaryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        padding: 18,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        width: '100%',
    },
    summaryBox: {
        flex: 1,
        alignItems: 'center',
    },
    summaryValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    summaryLabel: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    divider: {
        width: 2,
        height: '100%',
        backgroundColor: '#ddd',
        marginHorizontal: 10,
    },
    separatorLineFullWidth: {
        width: screenWidth,
        height: 6,
        backgroundColor: '#f0f0f0',
        alignSelf: 'center',
        marginBottom: 30,
    },
    separatorLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#f0f0f0',
        alignSelf: 'center',
        marginVertical: 8,
    },
    statRow: {
        width: '100%',
        marginBottom: 15,
    },
    statItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    statLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    statValue: {
        fontSize: 16,
        color: '#333',
        textAlign: 'right',
        flex: 1,
    },
    reportContainer: {
        width: '100%',
        marginBottom: 20,
    },
    reportText: {
        fontSize: 20,
        marginBottom: 10,
        color: '#333',
        fontWeight: 'bold',
    },
    reviewButton: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    reviewButtonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#f0f0f0",
        width: screenWidth,
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    goHomeButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#29387b',
        padding: 15,
        borderRadius: 8,
        width: '45%',
        alignItems: 'center',
    },
    goHomeText: {
        fontSize: 16,
        color: '#29387b',
        fontWeight: 'bold',
    },
    resumeButton: {
        backgroundColor: '#29387b',
        padding: 15,
        borderRadius: 8,
        width: '45%',
        alignItems: 'center',
    },
    resumeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Scoreboard;
