#include <stdio.h>

#define SIZE 3

void initializeBoard(char board[SIZE][SIZE]);

void printBoard(const char board[SIZE][SIZE]);

int checkWin(const char board[SIZE][SIZE]);

int isBoardFull(const char board[SIZE][SIZE]);

void getPlayerMove(char board[SIZE][SIZE], char player);

int main(void) {
    char board[SIZE][SIZE];
    char currentPlayer = 'X';
    int gameStatus = 0; // 0 = in corso, 1 = vittoria, -1 = pareggio
    initializeBoard(board);
    while (gameStatus == 0) {
        printBoard(board);
        getPlayerMove(board, currentPlayer);
        gameStatus = checkWin(board);
        if (gameStatus == 0 && isBoardFull(board))
            gameStatus = -1;
        if (gameStatus == 0)
            currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    }
    printBoard(board);
    if (gameStatus == 1)
        printf("Giocatore %c vince!\n", currentPlayer);
    else
        printf("Pareggio coglionazzo!\n");
    return 0;
}

void initializeBoard(char board[SIZE][SIZE]) {
    for (int i = 0; i < SIZE; i++)
        for (int j = 0; j < SIZE; j++)
            board[i][j] = ' ';
}

void printBoard(const char board[SIZE][SIZE]) {
    printf("  0 1 2\n");
    for (int i = 0; i < SIZE; i++) {
        printf("%d ", i);
        for (int j = 0; j < SIZE; j++) {
            printf("%c", board[i][j]);
            if (j < SIZE - 1) printf("|");
        }
        printf("\n");
        if (i < SIZE - 1) printf("  -+-+-\n");
    }
}

int checkWin(const char board[SIZE][SIZE]) {
    for (int i = 0; i < SIZE; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != ' ') return 1;
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != ' ') return 1;
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') return 1;
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') return 1;
    return 0;
}

int isBoardFull(const char board[SIZE][SIZE]) {
    for (int i = 0; i < SIZE; i++)
        for (int j = 0; j < SIZE; j++)
            if (board[i][j] == ' ') return 0;
    return 1;
}

void getPlayerMove(char board[SIZE][SIZE], char player) {
    int row, col;
    int validInput;
    do {
        printf("Giocatore %c, inserisci la tua mossa (riga e colonna), ricorda lo spazio tra i due numeri: ", player);
        validInput = scanf("%d %d", &row, &col);
        while (getchar() != '\n');
        if (validInput != 2 || row < 0 || row >= SIZE || col < 0 || col >= SIZE || board[row][col] != ' ') {
            printf("Input non valido. Riprova.\n");
            validInput = 0;
        }
    } while (!validInput);
    board[row][col] = player;
}