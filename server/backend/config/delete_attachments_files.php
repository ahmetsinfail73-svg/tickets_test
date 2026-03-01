<?php

function deleteFile(array $filepath): bool {
    for ($i = 0; $i < count($filepath); $i++) {
         if (file_exists(__DIR__ . "/../uploads/" . $filepath[$i])) {
            if (unlink(__DIR__ . "/../uploads/" . $filepath[$i])) {
                continue;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}