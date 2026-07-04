package com.offset.backend.util;

import java.text.Normalizer;
import java.util.function.Predicate;
import java.util.regex.Pattern;

public final class SlugUtil {

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]+");

    private SlugUtil() {}

    public static String slugify(String input) {
        String noWhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(noWhitespace, Normalizer.Form.NFD);
        String slug = NON_LATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase().replaceAll("-+", "-").replaceAll("^-|-$", "");
    }

    public static String uniqueSlug(String title, Predicate<String> exists) {
        String base = slugify(title);
        String candidate = base;
        int suffix = 1;
        while (exists.test(candidate)) {
            candidate = base + "-" + (++suffix);
        }
        return candidate;
    }
}