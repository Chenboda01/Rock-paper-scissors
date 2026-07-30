# Rock-paper-scissors — AGENTS.md

One-file CLI game. No dependencies, no tests, no build.

## Entrypoint

```bash
python rock-paper-scissor.py
```

Single module. Contains all game logic in a `while True` loop: prompt → validate → random choice → resolve → play again prompt.

## Input

- Choices: `r` (rock), `p` (paper), `s` (scissors). Case-insensitive, stripped.
- Play again: `y` / `n`.

## Notes

- File is named `rock-paper-scissor.py` (singular "scissor", not "scissors").
- Uses stdlib `random` only — no other imports.
- No test infrastructure. No lint/format config. No CI.
- The only way to verify changes is to run the script manually.
